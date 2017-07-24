* http://localhost:3000/ - Web
* http://localhost:3020/graphql - Graphql
* http://localhost:3010/ - Rest

```
  query homePageQuery {
    viewer {
    id
    widgets{
      edges{
        node{
          id
          name
          description
          color
          size
          quantity
        }
      }
    }
  }
}
```

```
query homePageQuery {
  viewer {
    id
    cars{
      edges{
        node{
          id
          make
          model
          color
          price
          year
        }
      }
    }
    
  }
}```