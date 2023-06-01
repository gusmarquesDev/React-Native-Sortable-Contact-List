import { View,Text } from 'react-native'
import { styles } from './styles'
import { Header } from '../../components/Header'
import { MovableCard } from '../../components/MovableCard'
import Animated,{event, useAnimatedScrollHandler, useSharedValue} from 'react-native-reanimated'

import {DATA} from '../../data/data'
import { CARD_HEIGHT } from '../../components/Card'
export function List(){

    const scrollY = useSharedValue(0);
   

    const handleScroll = useAnimatedScrollHandler((event) => {
         scrollY.value = event.contentOffset.y
    });

    const listToObject = (list: typeof DATA) =>{
    const listOfCard = Object.values(list)

    const obj: any = {};

    listOfCard.forEach((card, index) =>{
        obj[card.id] = index;
    });

    return obj
    }

    const cardsPosition = useSharedValue(listToObject(DATA));

       return(
        <View style={styles.container}>
              <Header/>
             <Animated.ScrollView
             style={styles.list}
             showsVerticalScrollIndicator={false}
             onScroll={handleScroll}
             contentContainerStyle={{ height: DATA.length * CARD_HEIGHT}}
             scrollEventThrottle={16}
             >
             {DATA.map((item) => (
             <MovableCard
               key={item.id}
               scrollY={scrollY}
               data={item}
               cardsPosition={cardsPosition}
               cardsCount={DATA.length}
              />
             ))}
             </Animated.ScrollView>

        </View>
    )
}