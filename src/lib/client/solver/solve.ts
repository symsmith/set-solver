import type { Card, CardSetting } from '$lib/shared/types/solver';

export function getNextCount(count: Card['count']): Card['count'] {
	return ((count % 3) + 1) as Card['count'];
}

export function getNextColor(color: Card['color']): Card['color'] {
	switch (color) {
		case 'green':
			return 'purple';
		case 'purple':
			return 'red';
		default:
			return 'green';
	}
}

export function getNextShape(shape: Card['shape']): Card['shape'] {
	switch (shape) {
		case 'diamond':
			return 'pill';
		case 'pill':
			return 'wave';
		default:
			return 'diamond';
	}
}

export function getNextFilling(filling: Card['filling']): Card['filling'] {
	switch (filling) {
		case 'empty':
			return 'striped';
		case 'striped':
			return 'full';
		default:
			return 'empty';
	}
}

function getNextFunction<T extends CardSetting>(setting: T): (setting: Card[T]) => Card[T] {
	return (
		{
			count: getNextCount,
			shape: getNextShape,
			color: getNextColor,
			filling: getNextFilling
		} as const
	)[setting] as unknown as (setting: Card[T]) => Card[T];
}

function getLastSetting<T extends CardSetting>(setting: T, card1: Card, card2: Card): Card[T] {
	const setting1 = card1[setting];
	const setting2 = card2[setting];
	if (setting1 === setting2) {
		return setting1;
	}
	const next1 = getNextFunction(setting)(setting1);
	const next2 = getNextFunction(setting)(setting2);
	if (next1 === setting2) {
		return next2;
	}
	return next1;
}

function getLastCardForSet(card1: Card, card2: Card): Card {
	return {
		color: getLastSetting('color', card1, card2),
		count: getLastSetting('count', card1, card2),
		filling: getLastSetting('filling', card1, card2),
		shape: getLastSetting('shape', card1, card2)
	};
}

function isSameCard(card1: Card, card2: Card) {
	return (
		card1.color === card2.color &&
		card1.count === card2.count &&
		card1.filling === card2.filling &&
		card1.shape === card2.shape
	);
}

export function findCard(card: Card, cards: Card[]) {
	return cards.find((c) => isSameCard(card, c));
}

export type Set = [Card, Card, Card];

export function isSameSet(set1: Set, set2: Set) {
	return set1.every((card) => findCard(card, set2));
}

function findSet(set: Set, sets: Set[]) {
	return sets.find((s) => isSameSet(s, set));
}

export function isSetInCards(set: Set, cards: Card[]) {
	return set.every((c) => findCard(c, cards));
}

export function getSets(cards: Card[]) {
	const sets: Set[] = [];
	for (let i = 0; i < cards.length; i++) {
		const card1 = cards[i];
		for (let j = i + 1; j < cards.length; j++) {
			const card2 = cards[j];
			if (!card1 || !card2) {
				continue;
			}

			const card3 = getLastCardForSet(card1, card2);
			const card3InCards = findCard(card3, cards);
			if (isSameCard(card1, card3) || !card3InCards) {
				continue;
			}

			const set: Set = [card1, card2, card3InCards];
			if (findSet(set, sets)) {
				continue;
			}

			sets.push(set);
		}
	}
	return sets;
}
