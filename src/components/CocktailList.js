import React from 'react';
import Cocktail from './Cocktail';
import Loading from './Loading';
import { useGlobalContext } from '../context';

const CocktailList = () => {
	const { loading, coctailList } = useGlobalContext();

	if (loading) {
		return <Loading />;
	}

	if (coctailList.length < 1) {
		return <h2 className="section-title">no coctails matched your search criteria</h2>;
	}

	return (
		<section className="section">
			<h2 className="section-title">coctails</h2>
			<div className="cocktails-center">
				{coctailList.map((coctail) => {
					return <Cocktail key={coctail.id} {...coctail} />;
				})}
			</div>
		</section>
	);
};

export default CocktailList;
