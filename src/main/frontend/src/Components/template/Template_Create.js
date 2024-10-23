import React, {useState} from 'react';
import Template_Editor from './Template_Editor';

const Template_Create = () => {
    const [inputTitle, setInputTitle] = useState('');
    const [inputContent, setInputContent] = useState('');

    const handleInputTitle = (e) => {
        setInputTitle(e.target.value);
    }

    return (
        <>
            <div className='editor'>
                <input className='title-input'
                    type='text'
                    placeholder='제목'
                    onChange={handleInputTitle}
                    name='Title'
                />
                <div className='warning'>
                    소스해제 하고 수정 안하면 저장 안됨 <br />
                </div>
                <div className='viewer'>
                    <Template_Editor setInputContent={setInputContent} />
                </div>
            </div>
        </>
    )
}

export default Template_Create;