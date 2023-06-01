import { View,Text } from 'react-native'
import { styles } from './styles'


export function Header(){

    return(
        <View style={styles.container}>
            <Text style={styles.tittle}>
                 Sortable Contact List 
            </Text>
        </View>
    )
}