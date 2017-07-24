```
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
          qty
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
          name
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