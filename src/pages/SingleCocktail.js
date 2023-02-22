import React, { useState, useEffect } from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

const SingleCocktail = () => {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [cocktail, setCocktail] = useState({})

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`${url}${id}`)
      const data = await response.json()
      const {
        strDrink: name,
        strDrinkThumb: image,
        strAlcoholic: info,
        strCategory: category,
        strGlass: glass,
        strInstructions: instructions,
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
      } = data.drinks[0]

      const ingredients = [
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
      ]

      setCocktail({
        name,
        image,
        info,
        category,
        glass,
        instructions,
        ingredients,
      })
    } catch (error) {
      console.log(error.response)
      setCocktail(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [id])

  if (isLoading) {
    return <Loading />
  }

  return (
    <section className="section cocktail-section">
      <Link to="/" className="btn btn-primary">
        Back home
      </Link>
      <h2 className="section-title">{cocktail.name}</h2>
      <div className="drink">
        <img src={cocktail.image} alt="" />
        <div className="drink-info">
          <p>
            <span className="drink-data">name : </span>
            {cocktail.name}
          </p>
          <p>
            <span className="drink-data">category : </span>
            {cocktail.category}
          </p>
          <p>
            <span className="drink-data">info : </span>
            {cocktail.info}
          </p>
          <p>
            <span className="drink-data">glass : </span>
            {cocktail.glass}
          </p>
          <p>
            <span className="drink-data">instructions : </span>
            {cocktail.instructions}
          </p>
          <p>
            <span className="drink-data">ingredients : </span>
            {cocktail?.ingredients?.map(
              (ingredient, index) =>
                ingredient && <span key={index}>{ingredient}</span>
            )}
          </p>
        </div>
      </div>
    </section>
  )
}

export default SingleCocktail
