import React, {useEffect, useState} from 'react';

interface Qa {
    id: number;
    item_id: number;
    question: string;
    answer: string;
    qa_type_id: number;
}

interface Props {
    item_id: string
}

const server = process.env.REACT_APP_API_URL || 'http://127.0.0.1:9000';

export const QaList = (props : Props) => {
    const [qas, setQas] = useState<Qa[]>([])
    const fetchQas = () => {
        // todo item_id取得
        fetch(server.concat('/qas/'.concat(props.item_id)),
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
                setQas(data.qas);
            })
            .catch(error => {
                console.error('GET error:', error)
            })
    }

    useEffect(() => {
        fetchQas();
    }, []);

    return (
        <div>
            {qas && qas.map((qa) => {
                return (
                    <div key={qa.id} className='QaList'>
                        <p>
                            <span>Question: {qa.question}</span>
                            <br/>
                            <span>Answer: {qa.answer}</span>
                        </p>
                    </div>
                )
            })}
        </div>
    )
}