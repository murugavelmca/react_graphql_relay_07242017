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
}
```
```
query homePageQuery {
            viewer {
              id
              ...widgetsTable_viewer
            }
          }
          fragment widgetsTable_viewer on Viewer {
  widgets (first: 100) {
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
```
```
query homePageQuery {
            viewer {
              id
              ...carsTable_viewer
            }
          }
         
fragment carsTable_viewer on Viewer {
  cars (first: 100){
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
```
```
query homePageQuery {
            viewer {
              id
              ...widgetsTable_viewer
              ...carsTable_viewer
            }
          }
          fragment widgetsTable_viewer on Viewer {
  widgets (first: 100) {
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
fragment carsTable_viewer on Viewer {
  cars (first: 100){
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
```
```
query homePageQuery {
            viewer {
              id
              ...widgetsTable_viewer
            }
          }
          
fragment widgetsTable_viewer on Viewer{
            widgets(last: 2){
              edges{
                node{
                  id
                  ...widgetsViewRow_widget
                }
              }
            }
          }

fragment widgetsViewRow_widget on Widget {
        id
        name
        description
        color
        size
        quantity
  }
          
```