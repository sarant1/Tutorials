import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { BatchWriteItemCommand } from "@aws-sdk/client-dynamodb";
import { create } from "domain";
import { v4 as uuidv4 } from 'uuid';

class Ddb {
    tableName: string;
    client = new DynamoDBClient({
        region: "us-east-1",
    });

    constructor(tableName: string) {
        this.tableName = tableName
        this.client = this.client
    }

    async createConversation(user1: string, user2: string) {

        // add to user 1's conversations

        const uuid = uuidv4()
        const input = {
            RequestItems: {
                [this.tableName]: [
                  // add conversationt to user's conversations
                  {
                    PutRequest: {
                      Item: {
                        pk: { "S": user1 },
                        sk: { "S": `CONV#${uuid}` },
                        isPrivate: { "BOOL": true },
                        title: { "S": user2 },
                        createAt: { "S": new Date().toISOString() }
                      }
                    },
                  },
                  // Add conversation to user2's converstions
                  {
                    PutRequest: {
                      Item: {
                        pk: { "S": user2 },
                        sk: { "S": `CONV#${uuid}` },
                        isPrivate: { "BOOL": true },
                        title: {S: user1 },
                        createAt: { "S": new Date().toISOString() }
                      }
                    }
                  }
                ]
            }
        }

        const command = new BatchWriteItemCommand(input)
        const response = await this.client.send(command)
        console.log(response)
        return response
    }
    

    // this could be moved to a lambda as a cognito hook on sign up
    async createUser(userId: string, email: string) {
        const input = {
            TableName: this.tableName,
            Item: {
              pk: { "S": userId},
              sk: { "S": "Attrs" },
              email: { "S": email},
              createdAt: { "S": new Date().toISOString() },
              FullName: { "S": ""}
        }
      }

      const command = new PutItemCommand(input)
      const response = await this.client.send(command)
      console.log(response)
      return response
    }
    
    createMessage() {
        
    }
    
    fetchMessages() {
        
    }
    
    fetchConversations() {
        
    }

}


export default Ddb

