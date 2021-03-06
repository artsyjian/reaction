import loadable from "@loadable/component"
import { graphql } from "react-relay"

const ArtworkApp = loadable(() => import("./ArtworkApp"))

export const routes = [
  {
    path: "/artwork/:artworkID/(confirm-bid)?",
    getComponent: () => ArtworkApp,
    prepare: () => {
      ArtworkApp.preload()
    },
    query: graphql`
      query routes_ArtworkQuery($artworkID: String!) {
        artwork(id: $artworkID) @principalField {
          ...ArtworkApp_artwork
        }
        me {
          ...ArtworkApp_me
        }
      }
    `,
    cacheConfig: {
      force: true,
    },
  },
]
