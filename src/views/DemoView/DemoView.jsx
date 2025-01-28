import ElmAutoComplete from '../../components/ElmAutoComplete/ElmAutoComplete';
import WeatherIcon from '../../components/WeatherIcon/WeatherIcon';

export default function DemoView() {
    return (
        <div id='demo' style={{background:"grey", height: "100vh"}}>
            <h1>Demo View</h1>
            <ElmAutoComplete />
            <WeatherIcon isday={true} icon="skc" size="sm" sx={{padding: '2em'}} />
            <WeatherIcon isday={true} icon="few" size="med" sx/>
            <WeatherIcon isday={true} icon="snow" size="lrg" color='black' sx/>
        </div>
    );  
}

