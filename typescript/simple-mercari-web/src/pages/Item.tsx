import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";

const server = process.env.REACT_APP_API_URL || 'http://127.0.0.1:9000';

interface ItemResponse {
    id: number;
    name: string;
    category: string;
    image: string;
    price: number;
    price_lower_limit: number;
}

export const Item: React.FC<{}> = () => {
    const {itemId} = useParams();
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
    const fetchImage = (image: string): string => {
        fetch(server.concat('/image/').concat(image),
            {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'image/jpeg',
                    'Accept': 'image/jpeg	',
                },
            })
            .then(response => response)
            .then(data => {
                return data.url
            })
            .catch(error => {
                console.error('GET error:', error)
            })
        return server.concat('/image/').concat(image)
    }
    
    return (
        <div>
            <img src={fetchImage(item.image)} alt={item.name + "の画像"}/>
            <h2>{item.name}</h2>
            <div>商品カテゴリ: {item.category}</div>
            <h2> ¥ {item.price}</h2>

            <Link to={"/"}>
                <div>もどる</div>
            </Link>
        </div>
    )
};