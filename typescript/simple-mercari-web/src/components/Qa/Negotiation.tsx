import React, {useState} from 'react'

const Negotiation = (props: { showQaModal: any; setShowQaModal: any; showPriceCut:any; setPriceCutModal:any; isNegotiate:any; setIsNegotiate:any; price_lower_limit:any; isSuccess: any; setIsSuccess: any; newPrice: any; setNewPrice: any;}) => {
      const closeModal = () => {
          props.setShowQaModal(false);
          props.setIsNegotiate(false);
          props.setPriceCutModal(false);
      };
  const [ price, setPrice ] = useState('');
    const handleChange = (event:any) => {
    setPrice(event.target.value)
    }
   const handleSubmit = (event:React.MouseEvent) => {
    event.persist()
    event.preventDefault()
    // バリデーション
    const error = Object.values(props).some((value) => {
      console.log(price);
      return Number(price) === 0;
    });
      
    if(error) {
     alert('未入力項目があります');
    } else {
      alert('送信します');
       //    todo 金額の値を渡して条件分岐する
           //    成立していたらsetIsContractでvalueをtrue、しなければfalse
      props.setIsNegotiate(true)
      
      props.setIsSuccess(price>=props.price_lower_limit)
      props.setNewPrice(price)
    }
   }
  const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter") {
   props.setIsNegotiate(true)
   event.persist()
   event.preventDefault()
   props.setIsSuccess(price>=props.price_lower_limit)
   props.setNewPrice(price)
    }
  };
return (
    <>
        <h2>値段交渉</h2>
        <form>
        <p>希望金額を入力してください。</p>
        <p><input type="text" name="price" placeholder="1000" value={price} onChange={handleChange} onKeyDown={keyDownHandler}/></p>
        </form>
{/*       todo   ここの出力を「交渉する」ボタンにしたい*/}
        <button onClick={closeModal}>閉じる</button>
        <button onClick={handleSubmit}>交渉する</button>
    </>
  )
};


export default Negotiation;