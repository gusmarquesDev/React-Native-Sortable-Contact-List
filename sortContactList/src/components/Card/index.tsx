import { View, Text } from 'react-native'
import { HEIGHT, MARGIN_BOTTOM, styles } from './styles'
import { MaterialIcons } from '@expo/vector-icons'
import { DATA } from '../../data/data'

export const CARD_HEIGHT = HEIGHT + MARGIN_BOTTOM;


export type CardProps = {
    id: number,
    tittle: string
}

type Props = {
    data: CardProps
}
export function Card({ data }: Props) {

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ width: 30, height: 30, borderRadius: 150, backgroundColor: '#c1c1c1', marginRight: 7, justifyContent: 'center', alignItems: 'center' }}>
                    <MaterialIcons
                        name='person'
                        size={20}
                        color="#000000"
                    />
                </View>
                <Text style={styles.tittle}>
                    {data.tittle}
                </Text>
            </View>
            <MaterialIcons
                name='drag-indicator'
                size={20}
                color="#000000"
            />
        </View>
    )
}