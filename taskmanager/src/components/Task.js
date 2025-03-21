import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import moment from 'moment-timezone'
import 'moment/locale/pt-br'

import Icon from "react-native-vector-icons/FontAwesome"
import commonStyles from '../commonStyles'

export default props => {

    const date = props.doneAt ? props.doneAt : props.estimateAt
    const formattedDate = moment(date).tz('America/Sao_Paulo').locale('pt-br').format('ddd, D [de] MMMM');

    const doneOrNotStyle = props.doneAt != null ? {textDecorationLine: 'line-through'} :  {}

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={() => props.onToggleTask(props.id)}>
                <View style={styles.checkContainer}>
                    {getCheckView(props.doneAt)}
                </View>
            </TouchableWithoutFeedback>
            <View>
                <Text style={[styles.desc, doneOrNotStyle]}>{props.desc}</Text>
                <Text style={styles.date}>{formattedDate}</Text>
            </View>
        </View>
    )
}

function getCheckView(doneAt) {
    if (doneAt != null) {
        return (
            <View style={styles.done}>
                <Icon name='check' size={20} color='#fff'/>
            </View>
        )
    } else {
        return (
            <View style={styles.pending}></View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#AAA',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#FFF'
    },
    checkContainer: {
        width: '20%',
        alignContent: 'center',
        alignItems: 'center'
    },
    pending: {
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#555'
    },
    done: {
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#555',
        backgroundColor: 'rgb(85, 177, 57)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    desc: {
        color: commonStyles.colors.mainText,
        fontSize: 15
    },
    date: {
        color: '#555',
        fontSize: 12
    }
})
