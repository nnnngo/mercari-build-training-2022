import React, { useState } from 'react';

const server = process.env.REACT_APP_API_URL || 'http://127.0.0.1:9000';

export const Listing: React.FC<{}> = () => {
  const initialState = {
    user_name: "",
    password: "",
    name: "",
    category: "",
    image: new File([new Blob()], "", {lastModified: 0}),
    price: "0",
    price_lower_limit: "0",
    question1 : "",
    answer1: "",
    question2 : "",
    answer2: "",
    question3 : "",
    answer3: "",
  };
  const [values, setValues] = useState(initialState);
  
  const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values, [event.target.name]: event.target.files![0],
    })
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData()
    data.append('user_name', values.user_name)
    data.append('password', values.password)
    data.append('name', values.name)
    data.append('category', values.category)
    data.append('image', values.image)
    data.append('price', values.price)
    data.append('price_lower_limit', values.price_lower_limit)
    data.append('question1', values.question1)
    data.append('answer1', values.answer1)
    data.append('question2', values.question2)
    data.append('answer2', values.answer2)
    data.append('question3', values.question3)
    data.append('answer3', values.answer3)


    fetch(server.concat('/items'), {
      method: 'POST',
      mode: 'cors',
      body: data,
    })
    .then(response => response.json())
    .then(data => {
      console.log('item POST success:', data);
    })
    .catch((error) => {
      console.error('item POST error:', error);
    })
  };
  return (
    <div className='Listing'>
      <form onSubmit={onSubmit}>
        <div>
            <label>UserName</label>
            <input type='text' name='user_name' id='user_name' placeholder='user_name' onChange={onValueChange} required/>
            <label>Password</label>
            <input type='text' name='password' id='password' placeholder='password' onChange={onValueChange}/>
            <br></br>
            <label>ItemName</label>
            <input type='text' name='name' id='name' placeholder='name' onChange={onValueChange} required/>
            <label>Category</label>
            <input type='text' name='category' id='category' placeholder='category' onChange={onValueChange}/>
            <br></br>
            <label>File</label>
            <input type='file' name='image' id='image' placeholder='image' onChange={onFileChange}/>
            <br></br>
            <label>Price</label>
            <input type='text' name='price' id='price' placeholder='price' onChange={onValueChange}/>
            <label>PriceLowerLimit</label>
            <input type='text' name='price_lower_limit' id='price_lower_limit' placeholder='price_lower_limit' onChange={onValueChange}/>
            <br></br>
            <label>Question1</label>
            <input type='text' name='question1' id='question1' placeholder='question1' onChange={onValueChange}/>
            <label>Answer1</label>
            <input type='text' name='answer1' id='answer1' placeholder='answer1' onChange={onValueChange}/>
            <br></br>
            <label>Question2</label>
            <input type='text' name='question2' id='question2' placeholder='question2' onChange={onValueChange}/>
            <label>Answer2</label>
            <input type='text' name='answer2' id='answer2' placeholder='answer2' onChange={onValueChange}/>
            <br></br>
            <label>Question3</label>
            <input type='text' name='question3' id='question3' placeholder='question3' onChange={onValueChange}/>
            <label>Answer3</label>
            <input type='text' name='answer3' id='answer3' placeholder='answer3' onChange={onValueChange}/>
            <br></br>
            <button type='submit'>List this item</button>
        </div>
      </form>
    </div>

  );
}
