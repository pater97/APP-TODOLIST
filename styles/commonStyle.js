import { StyleSheet } from "react-native";

export default StyleSheet.create({
    genericContainer:{
        flex:1
    },
    container2:{
        flex:2
    },
    container3:{
        flex:3
    },
    column:{
        flexDirection:'column'
    },
    inputBox: {
        height: 40,
        width:300,
        margin: 12,
        borderWidth: .2,
        padding: 10,
        borderColor:'blueviolet'
    },
    centerItems:{
        justifyContent:"center",
        alignItems:"center"
    },
    centerVertical:{
        alignItems:'center'
    },
    centerHorizontal:{
        justifyContent:'center'
    },
    paddingContainer:{
        paddingVertical:50,
        paddingHorizontal:6
    },
    titleFont:{
        fontSize:40,
        textAlign:'center',
        color:'blueviolet',
        fontWeight:'bold',
        letterSpacing:20
    },
    titleBg: {
        backgroundColor:'blueviolet',
    },
    buttonBox:{
        paddingHorizontal:30,
        paddingVertical:10,
        borderRadius:10,
        margin:10
    },
    lineButton:{
        color:'blueviolet',
        textDecorationLine:'underline'
    },
    whiteColor:{
        color:'#f6f6f6'
    },
    boldFont:{
        fontWeight:'bold'
    },
    itemListBox:{
        display:"flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent:"space-between",
        backgroundColor:'#f6f6f6',
        margin:5,
        padding:10,
        borderRadius:10,
    },
    todoBox:{
        marginVertical:20
    },
    halfWidth:{
        width:'50%'
    },
    normalTextSize:{
        fontSize:20
    },
    deleteText:{
        justifyContent:'flex-end',
    },
    branColorText:{
        color:'blueviolet'
    },
    lineThrough:{
        textDecorationLine:'line-through'
    }
})