import React, {useState} from "react";
import {QaList} from "./QaList";
import Negotiation from './Negotiation'

export const QaModal = (props: { showQaModal: any; setShowQaModal: any; }) => {
    const closeModal = () => {
        props.setShowQaModal(false);
        setIsNegotiate(false);
        setPriceCutModal(false);
    };
    const [showPriceCut, setPriceCutModal] = useState(false); // PriceCutコンポーネントの表示の状態を定義する
    const [isNegotiate, setIsNegotiate] = useState(false); // 値引き交渉中かどうかのステータス
    const [isSuccess, setIsSuccess] = useState(true); // 交渉成功かどうかのステータス
    const ShowPriceCutModal = () => {
        setPriceCutModal(true);
    };

    return (
        <>
            {props.showQaModal ? ( // showFlagがtrueだったらModalを表示する
                <div id="overlay" style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0,0,0,0.5)",

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    <div id="modalContent" style={{
                        background: "white",
                        padding: "10px",
                        borderRadius: "3px",
                    }}>

                        {isNegotiate ? (
                        <>
                            { isSuccess ? (
                            <>
                            <div>交渉成立</div>
                            <button onClick={closeModal}>閉じる</button>
                            </>
                            ):(
                            <>
                            <div>交渉失敗</div>
                            <button onClick={closeModal}>閉じる</button>
                            </>
                            )}
                        </>
                        ) : (
                            <>
                                {showPriceCut ? (
                                    // 値切りフェースの場合
                                    <>
                                        <div><Negotiation showQaModal={props.showQaModal} setShowQaModal={props.setShowQaModal} showPriceCut={showPriceCut} setPriceCutModal={setPriceCutModal} isNegotiate={isNegotiate} setIsNegotiate={setIsNegotiate}/></div>
                                    </>
                                ) : (
                                    // QAフェーズの場合
                                    <>
                                        <div><QaList/></div>
                                        <button onClick={closeModal}>閉じる</button>
                                        <button onClick={ShowPriceCutModal}>値段交渉へ</button>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </div>
            ) : (
                <></>// showFlagがfalseの場合はModalは表示しない
            )}
        </>
    )
}