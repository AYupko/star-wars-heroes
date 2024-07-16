import { Film, Hero, Starship } from "@/types/types";
import { Edge, Node } from "reactflow";


export const createNodesAndEdges = (hero: Hero, films: Film[], starships: Starship[]) => {
  
  // Nodes - objects, which we need to link between each others
  
  const nodes: Node[] = [
    {
      id: `hero-${hero.id}`,
      type: 'input',
      data: { label: hero.name },
      position: { x: 550, y: 0 },
    },
  ];

  // Edges - links between objects

  const edges: Edge[] = [];
  
  // For each film where char is present we create a node

  films.forEach((film, filmIndex) => {
    nodes.push({
      id: `film-${film.id}`,
      type: 'default',
      data: { label: film.title },
      // taking index as a gap between elements in our graph
      position: { x: 350 + filmIndex * 200, y: 150 },
    });

    edges.push({
      id: `hero-${hero.id}-film-${film.id}`,
      source: `hero-${hero.id}`,
      target: `film-${film.id}`,
    });

    // filtering only those ships, which shows in certain movies and create a node
    
    starships
      .filter((starship) => starship.films.includes(film.id))
      .forEach((starship, starshipIndex) => {
        nodes.push({
          id: `starship-${starship.id}`,
          type: 'output',
          data: { label: starship.name },
          position: { x: 350 + starshipIndex * 200, y: 350 },
        });

        edges.push({
          id: `film-${film.id}-starship-${starship.id}`,
          source: `film-${film.id}`,
          target: `starship-${starship.id}`,
        });
      });
  });

  return { nodes, edges };
};