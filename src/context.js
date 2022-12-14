import React, { useState, useContext, useEffect } from 'react';
import { useCallback } from 'react';

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
	const [loading, setLoading] = useState(true);
	const [searchParam, setSearchParam] = useState('a');
	const [coctailList, setCoctailList] = useState([]);

	const fetchDrinks = useCallback(async () => {
		setLoading(true);
		try {
			const response = await fetch(`${url}${searchParam}`);
			const data = await response.json();
			const { drinks } = data;
			if (drinks) {
				const newCocktails = drinks.map((drink) => {
					const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } = drink;
					return { id: idDrink, name: strDrink, image: strDrinkThumb, info: strAlcoholic, glass: strGlass };
				});
				setCoctailList(newCocktails);
				setLoading(false);
			} else {
				setCoctailList([]);
				setLoading(false);
			}
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	}, [searchParam]);

	useEffect(() => {
		fetchDrinks();
	}, [searchParam, fetchDrinks]);

	return (
		<AppContext.Provider
			value={{
				loading,
				coctailList,
				setSearchParam,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
// make sure use
export const useGlobalContext = () => {
	return useContext(AppContext);
};

export { AppContext, AppProvider };
