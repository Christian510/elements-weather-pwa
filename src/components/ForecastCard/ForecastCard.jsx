import { styled } from '@mui/material/styles';
import { CardContent, Typography } from '@mui/material';


function ForecastCard({ content, styles, Icon }){
    // console.log('title: ', title);
    // console.log('content: ', content);

    const Content = styled(CardContent)(({ theme }) => ({ // Add theme object to the styles object
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        textAlign: 'center',
        padding: '.9em',
        height: '100%',
        color: theme.palette.text.primary,
    }));

    return (
            <Content>
                <Typography variant="h6">{content.hour}</Typography>
                <Icon />
                {/* <Typography variant="body2">{content.isDaytime ? 'High' : 'Low'} {content.temp.temp} {content.temp.tempUnit}</Typography> */}
                {/* <Typography variant="body2">{content.forecast}</Typography> */}
                <Typography variant="h6">{content.temp.temp}&deg;</Typography>
            </Content>
    );
};

export default ForecastCard;