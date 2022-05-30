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
            <input type='text' name='user_name' id='user_id' placeholder='user_id' onChange={onValueChange} required/>
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
            <button type='submit'>List this item</button>
        </div>
      </form>
    </div>

  );
}
