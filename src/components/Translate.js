import React, { useState, useEffect } from 'react';

import {
    Form,
    TextArea,
    Button, 
   
} from 'semantic-ui-react';
import axios from 'axios';

export default function Translate() {
    const [inputText, setInputText] = useState('');
    const [resultText, setResultText] = useState('');
    const [selectedLanguageKey, setLanguageKey] = useState('')
    const [languagesList, setLanguagesList] = useState([])
    const [detectLanguageKey, setdetectedLanguageKey] = useState('')
    const getLanguageSource = () => {
        axios.post(`https://libretranslate.de/detect`, {
            q: inputText
        })
        .then((response) => {
            setdetectedLanguageKey(response.data[0].language)
        })
    }
    const translateText = () => {
        setResultText(inputText)

        getLanguageSource();

        let data = {
            q : inputText,
            source: detectLanguageKey,
            target: selectedLanguageKey
        }
        axios.post(`https://libretranslate.de/translate`, data)
        .then((response) => {
            setResultText(response.data.translatedText)
        })
    }

    const languageKey = (selectedLanguage) => {
        setLanguageKey(selectedLanguage.target.value)
    }

    useEffect(() => {
       axios.get(`https://libretranslate.de/languages`)
       .then((response) => {
        setLanguagesList(response.data)
       })

       getLanguageSource()
    }, [inputText])
    return (
        <div>
            <div className="app-header">
           
            <h2 className="header"> <img src="favicon-32x32.png" className="App-logo" alt="logo" /> Text (2)Translate  <img src="favicon-32x32.png" className="App-logo" alt="logo" /> </h2>
                <p className='app-p'>Learn or translate different languages<br /> of your chioce, Arabic, French, Chinese and more...
               <br /> (Accurate Translations for Individuals, Young and Adults)</p>
            </div>
            <hr />
            <div className='app-body'>
            <div className='responsive'>
                    <Form>
                        
                    <Form.Field className='input-text'
                            control="input"
                            placeholder='Enter Text to Translate..'
                            
                            onChange={(e) => setInputText(e.target.value)}
                        />
                        
                        <br />

                        <select className="language-select" onChange={languageKey}>
                            <option>Please Select Language..</option>
                            {languagesList.map((language) => {
                                return (
                                    <option value={language.code}>
                                        {language.name}
                                    </option>
                                )
                            })}
                        </select>

                        <Button className='button'
                            color="orange" 
                            size="large" 
                            onClick={translateText}
                        >
                           
                            Translate</Button>

                        <br />
                        <br />
                        <Form.Field
                            control={TextArea}
                            placeholder='Your Result Translation..'
                            value={resultText}
                        />
                    </Form>
                </div>
            </div>
            <br /> <br /> <hr />
<div><p className='author'>Created With Love By Balikis-Omolewa</p></div>
        </div>
    )
}
