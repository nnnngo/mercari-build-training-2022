import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {QaList} from "./QaList";
import Negotiation from './Negotiation'
const server = process.env.REACT_APP_API_URL || 'http://127.0.0.1:9000';

    interface ItemResponse {
        id: number;
        name: string;
        category: string;
        image: string;
        price: number;
        price_lower_limit: number;
    }
export const QaModal = (props: { showQaModal: any; setShowQaModal: any; }) => {
    const [showPriceCut, setPriceCutModal] = useState(false); // PriceCutコンポーネントの表示の状態を定義する
    const [isNegotiate, setIsNegotiate] = useState(false); // 値引き交渉中かどうかのステータス
    const [isSuccess, setIsSuccess] = useState(false); // 交渉成功かどうかのステータス
    const closeModal = () => {
        props.setShowQaModal(false);
        setIsNegotiate(false);
        setPriceCutModal(false);
    };
    const showPriceCutModal = () => setPriceCutModal(true);

    // 以下getの処理
    const {itemId} = useParams();
    console.log(itemId)
    const [item, setItem] = useState<ItemResponse>({id: -1, name:"", category: "", image: "", price: -1, price_lower_limit: -1})

        useEffect(() => {
            fetchItems();
        }, []);

        const fetchItems = () => {
            fetch(server.concat('/items/' + itemId),
                {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                })
                .then(response => response.json())
                .then(data => {
                    console.log('GET success:', data);
                    setItem(data)
                })
                .catch(error => {
                        console.error('GET error:', error)
                    }
                )
        }

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
                                        <div><Negotiation
                                        showQaModal={props.showQaModal}
                                        setShowQaModal={props.setShowQaModal}
                                        showPriceCut={showPriceCut}
                                        setPriceCutModal={setPriceCutModal}
                                        isNegotiate={isNegotiate}
                                        setIsNegotiate={setIsNegotiate}
                                        price_lower_limit={item.price_lower_limit}
                                        isSuccess={isSuccess}
                                        setIsSuccess={setIsSuccess}
                                        /></div>
                                    </>
                                ) : (
                                    // QAフェーズの場合
                                    <>
                                        <div><QaList/></div>
                                        <button onClick={closeModal}>閉じる</button>
                                        <button onClick={showPriceCutModal}>値段交渉へ</button>
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