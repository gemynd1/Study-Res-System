import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
// import Editor from 'ckeditor5-custom-project/src/main';
import Editor from 'ckeditor5-custom-build/build/ckeditor';

const Template_Editor = (props) => {
    return (
        <>
            <CKEditor
                editor={Editor}
                data={props.data}
                onReady={editor => {
                    console.log('Editor is ready to use!', editor);
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    props.setInputContent(data);
                    console.log({event,editor,data});
                }}
                onBlur={(event, editor) => {
                    console.log('Blur', editor);
                }}
                onFocus={(event, editor) => {
                    console.log('Focus', editor);
                }}
            >
            </CKEditor>
        </>
    )
}
export default Template_Editor;