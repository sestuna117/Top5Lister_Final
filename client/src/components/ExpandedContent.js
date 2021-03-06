import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import CommentsSection from './CommentsSection';

function ExpandedContent(props) {
    const { listInfo } = props;

    return (
        <div className="expanded-content">
            <List sx={{ width: listInfo.published === '1970-01-01' ? '100%' : '50%', backgroundColor: '#30316c', borderRadius: 3 }}>
                {
                    listInfo.items.map((item, index) => (
                        <ListItem key={index} sx={{ color: '#c9af4f', fontSize: 24, fontWeight: 'bold', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                            {`${index + 1}. ${item}`}
                        </ListItem>
                    ))
                }
            </List>
            <CommentsSection listInfo={listInfo} />
        </div>
    )
}

export default ExpandedContent;