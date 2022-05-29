import React, {useState} from 'react'

const Negotiation = () => {
  const [ price, setPrice ] = useState('');
    const handleChange = (event:any) => {
    setPrice(event.target.value)
    }
   const handleSubmit = (event:React.MouseEvent) => {
   event.persist()
   event.preventDefault()
   console.log(price)
   }


return (
    <>
        <h2>値段交渉</h2>
        <form>
        <p>希望金額を入力してください。例: 1000</p>
        <p><input type="text" name="price" value={price} onChange={handleChange}/></p>
        </form>
{/*          こっちにボタン作成してフォームの情報を維持したい*/}
        <button onClick={handleSubmit}>次</button>
    </>
  )
};


export default Negotiation;