import { ApolloClient, InMemoryCache } from "@apollo/client"
import { favoriteVar } from "../cache"
const client = new ApolloClient({
    uri: "http://localhost:4000/",
    cache: new InMemoryCache({
        typePolicies : {
            Query : {
                fields : {
                    favorites: {
                        read() {
                            return favoriteVar()
                        }
                    }
                }
            }
        }
    })
})

export default client