import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import CommentsSection from './CommentsSection';

function CommunityExpandedContent(props) {
    const { listInfo, items } = props;

    return listInfo && items ? (
        <div className="expanded-content">
            <List sx={{ width: '50%', backgroundColor: '#30316c', borderRadius: 3, paddingTop: 0 }}>
                {
                    items.map((item, index) => (
                        <ListItem key={index} sx={{ color: '#c9af4f', fontSize: 24, fontWeight: 'bold', paddingTop: 0, paddingBottom: 0 }}>
                            {`${index + 1}. `}
                            <div style={{ paddingLeft: 10 }}>
                                <div style={{ paddingTop: '14px', fontSize: 23 }}>{item.name}</div>
                                <div style={{ fontSize: '12px' }}>({item.points}) Votes</div>
                            </div>
                        </ListItem>
                    ))
                }
            </List>
            <CommentsSection listInfo={listInfo} communityVer={true} />
        </div>
    ) : null
}

export default CommunityExpandedContent;