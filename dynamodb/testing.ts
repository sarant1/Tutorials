import Ddb from './dynamodb'




const client = new Ddb("ChatWave")

try {
    client.createConversation("USER#54321", "USER#32145")
    client.createUser("USER#54321", "samiam@gmail.com")
} catch (error) {
    console.log(error)
}
