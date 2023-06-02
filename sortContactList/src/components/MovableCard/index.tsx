import { useState } from 'react'
import Animated, {
    SharedValue,
    event,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    useAnimatedReaction,
    withSpring
} from "react-native-reanimated";
import { CARD_HEIGHT, Card, CardProps } from "../Card";
import { GestureDetector, Gesture } from 'react-native-gesture-handler'
import { styles } from './styles';


type Props = {
    data: CardProps;
    cardsPosition: SharedValue<number[]>;
    scrollY: SharedValue<number>;
    cardsCount: number;
}


export function MovableCard({ data, cardsPosition, scrollY, cardsCount }: Props) {
    const [moving, setMoving] = useState(false)
    const top = useSharedValue(cardsPosition.value[data.id] * CARD_HEIGHT)


    function objectMove(positions: number[], from: number, to: number) {
        'worklet';
        const newPosition = Object.assign({}, positions);

        for (const id in positions) {
            if (positions[id] === from) {
                newPosition[id] = to;
            }
            if (positions[id] === to) {
                newPosition[id] = from;
            }


        }
        return newPosition
    }

    useAnimatedReaction(() => cardsPosition.value[data.id],
        (currentPosition, previousPosition) => {
            if (currentPosition !== previousPosition) {
                if (!moving) {
                    top.value = withSpring(currentPosition * CARD_HEIGHT)

                }
            }
        }, [moving]
    )
    const longPressGesture = Gesture
        .LongPress()
        .onStart(() => {
            runOnJS(setMoving)(true)
        })
        .minDuration(200);


    const panGesture = Gesture
        .Pan()
        .manualActivation(true)
        .onTouchesMove((_, state) => {
            moving ? state.activate() : state.fail();
        })
        .onUpdate((event) => {
            const postionY = event.absoluteY
            top.value = postionY - CARD_HEIGHT;
            const startPositionList = 0;
            const endPositionList = cardsCount - 1
            const currentPosition = Math.floor(postionY / CARD_HEIGHT);
            'worklet';
            const newPosition = Math.max(startPositionList, Math.min(currentPosition, endPositionList))
            if (newPosition !== cardsPosition.value[data.id]) {
                cardsPosition.value = objectMove(cardsPosition.value, cardsPosition.value[data.id], newPosition)
            }
        })
        .onFinalize(() => {
            const newPosition = cardsPosition.value[data.id] * CARD_HEIGHT;
            top.value = withSpring(newPosition);
            runOnJS(setMoving)(false)
        })
        .simultaneousWithExternalGesture(longPressGesture)



    const animatedStyle = useAnimatedStyle(() => {
        return {
            top: top.value - CARD_HEIGHT,
            opacity: moving ? 1 : 0.4

        }
    }, [moving])
    return (
        <Animated.View style={[styles.container, animatedStyle]}>
            <GestureDetector gesture={Gesture.Simultaneous(panGesture, longPressGesture)}>
                <Card
                    data={data} />
            </GestureDetector>


        </Animated.View>
    )
}