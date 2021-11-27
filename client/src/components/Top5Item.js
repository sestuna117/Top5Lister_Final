import { React } from "react";
import TextField from '@mui/material/TextField';
import { Typography } from "@mui/material";
/*
    This React component represents a single item in our
    Top 5 List, which can be edited or moved around.
    
    @author McKilla Gorilla
*/
function Top5Item(props) {
    let { index, changeTexts, texts } = props;
    
    function handleChange(event) {
        let newTexts = texts.slice();
        newTexts[index+1] = event.target.value;
        changeTexts(newTexts);
    }

    let itemClass = "top5-item";

    return (
        <div className='top5-item-row'>
            <div className="item-number"><Typography variant="h4">{index + 1}.</Typography></div>
            <div style={{ width: '90%', margin: 'auto'}}>
                <TextField
                    onChange={handleChange}
                    fullWidth
                    variant='outlined'
                    margin="none"
                    required
                    id={'item-' + (index + 1)}
                    name={'item-' + (index + 1)}
                    className={itemClass}
                    value={texts[index + 1]}
                    inputProps={{ style: { fontSize: 24, backgroundColor: '#c9af4f' } }}
                />
            </div>
        </div>
    )
}

export default Top5Item;