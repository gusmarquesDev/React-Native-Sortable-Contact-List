import {StyleSheet} from 'react-native'

export const HEIGHT = 68;
export const MARGIN_BOTTOM = 12;

export const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:HEIGHT,
        borderRadius: MARGIN_BOTTOM,
        backgroundColor:'#D5D8DC',
        padding:16,
        flexDirection:'row',
        borderWidth:1.5,
        borderColor:'#E4E4E4',
        alignItems:'center',
        justifyContent:'space-between',
    },
    tittle:{
        fontWeight:'bold',
        fontSize:18,
        color:'#000000'
    }
})