export default ({ dispatch, getState }) => next => action => {
  let constructedUrl = ''
  if(action.api) {
    const user = getState().user
    const cooked = getState().recipes.cooked
    const dislikes = []
    if(user.dislikes) {
      user.dislikes.forEach(el => {
        for (var key in el) {
          if (el.hasOwnProperty(key)) {
            dislikes.push(el[key])
          }
        }
      });
    }
    const excludeIngredients= user.dislikes ? `excludeIngredients=${dislikes.join('%2C+')}` : '';
    const intolerances= user.allergies ? `$intolerances=+${user.allergies.join('%2C+')}` : '';
    const diet= user.diets ? `diet='${user.diets.join('%2C+')}`: '';
    const offset = cooked ? cooked + 7 : 0
    const query = '*'
    constructedUrl=`${action.api.url}&${diet}&${excludeIngredients}&instructionsRequired=true${intolerances}&limitLicense=true&number=7&offset=${offset}&type=main+course`
    const config = action.api.config || { method : 'GET '};
    console.log(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com`)
    console.log(`${constructedUrl}`);
    return fetch (`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com${constructedUrl}`, config)
      .then(res => res.json())
      .then(data => {
        if(action.api.next) {
          data.results.forEach((el) => {
            dispatch(action.api.success(el))
            dispatch(action.api.nextFunction(el.id))
          })
        }
        else {
          dispatch(action.api.success(data , action.api.id))
          data.extendedIngredients.forEach(el => {
            fetch(`https://dev.tescolabs.com/grocery/products/?query=${el.name}&offset=0&limit=1`, { headers : {'Ocp-Apim-Subscription-Key': '9fe27cf57c544f759e594aaaa8c97230'}})
              .then(res => res.json())
              .then(data => {
                console.log('eLEMENT', el.id);
                if (data.uk.ghs.products.results.length>0) {
                  dispatch(action.api.nextFunction({price: data.uk.ghs.products.results[0].price, name: data.uk.ghs.products.results[0].name}, el.id, action.api.id))
                } else {
                  fetch(`https://dev.tescolabs.com/grocery/products/?query=${data.uk.ghs.products.suggestions[0].text}&offset=0&limit=1`, { headers : {'Ocp-Apim-Subscription-Key': 'd4ebba80a86840649b7afc85639ee0b7'}})
                    .then(res => res.json())
                    .then(data => {
                      dispatch(action.api.nextFunction({price: data.uk.ghs.products.results[0].price, name: data.uk.ghs.products.results[0].name}, el.id, action.api.id))
                    })
                }
              })
          })
        }
      })
      .catch((err) => {
        throw err
      })
  } else {
    next(action)
  }
};
