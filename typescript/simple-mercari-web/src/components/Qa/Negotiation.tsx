import React, {useState} from 'react'

const Negotiation = (props: { showQaModal: any; setShowQaModal: any; showPriceCut:any; setPriceCutModal:any; isNegotiate:any; setIsNegotiate:any; suggestPrice:any; setSuggestPrice:any;}) => {
      const closeModal = () => {
          props.setShowQaModal(false);
          props.setIsNegotiate(false);
          props.setPriceCutModal(false);
      };
  const [ price, setPrice ] = useState(0);
    const handleChange = (event:any) => {
    setPrice(event.target.value)
    }
   const handleSubmit = (event:React.MouseEvent) => {
   //    todo 金額の値を渡して条件分岐する
           //    成立していたらsetIsContractでvalueをtrue、しなければfalse
   props.setIsNegotiate(true)
   event.persist()
   event.preventDefault()
   console.log(price)
   props.setSuggestPrice(price)
   }

return (
    <>
        <h2>値段交渉</h2>
        <form>
        <p>希望金額を入力してください。例: 1000</p>
        <p><input type="text" name="price" value={price} onChange={handleChange}/></p>
        </form>
{/*       todo   ここの出力を「交渉する」ボタンにしたい*/}
        <button onClick={closeModal}>閉じる</button>
        <button onClick={handleSubmit}>交渉する</button>
    </>
  )
};


export default Negotiation;