import { Api, Gql, Zeus } from './graphql-zeus';
import chalk from 'chalk';
// This will return Card object with ID only
const createCards = async () => {
  const api = Api('https://faker.graphqleditor.com/aexol/olympus/graphql');
  const printQueryResult = (name, result) =>
    console.log(
      `${chalk.greenBright(name)} result:\n${chalk.cyan(JSON.stringify(result, null, 4))}\n\n`
    );
  const printGQLString = (name, result) =>
    console.log(`${chalk.blue(name)} query:\n${chalk.magenta(result)}\n\n`);
  // one Query example
  const drawedCard = await api.Query.drawCard({
    Attack: true,
    name: true
  });
  printQueryResult('drawCard', drawedCard);
  // Query Gqling example
  const listCardsAndDraw = await Gql.Query({
    cardById: [
      {
        cardId: 'sdsd'
      },
      {
        description: true
      }
    ],
    listCards: {
      name: true,
      skills: true,
      attack: [
        { cardID: ['s', 'sd'] },
        {
          name: true
        }
      ]
    },
    drawCard: {
      name: true,
      skills: true,
      Attack: true
    }
  });
  printQueryResult('Multiple queries', listCardsAndDraw);
  // mutation example
  const addCard = await Gql.Mutation({
    addCard: [
      {
        card: {
          name: 'Zeus',
          description: 'Allmighty',
          skills: ['THUNDER'],
          Attack: 1,
          Defense: 1
        }
      },
      {
        name: true,
        description: true,
        skills: true
      }
    ]
  });
  printQueryResult('addCard', addCard);

  const { drawChangeCard } = await Gql.Query({
    drawChangeCard: {
      __typename: true,
      '...on EffectCard': {
        effectSize: true,
        name: true
      },
      '...on SpecialCard': {
        effect: true,
        name: true
      }
    }
  });
  printQueryResult('drawChangeCard', drawChangeCard);
  // string example
  const stringGql = Zeus.Query({
    listCards: {
      name: true,
      skills: true,
      Attack: true
    }
  });
  // query{listCards{name skills Attack}}

  printGQLString('listCards', stringGql);
};
createCards();
