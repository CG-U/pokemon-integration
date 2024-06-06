const typeColorEnum = [
  {
    key: "bug",
    solo: "bg-green-300",
    front: "bg-gradient-to-r from-green-300 ",
    middle: "via-green-300",
    end: "to-green-300",
    color: "green-300",
  },
  {
    key: "dragon",
    solo: "bg-red-500",
    front: "bg-gradient-to-r from-red-500 ",
    middle: "via-red-500",
    end: "to-red-500",
    color: "red-500",
  },
  {
    key: "rock",
    solo: "bg-slate-500",
    front: "bg-gradient-to-r from-slate-500 ",
    middle: "via-slate-500",
    end: "to-slate-500",
    color: "slate-500",
  },
  {
    key: "psychic",
    solo: "bg-pink-300",
    front: "bg-gradient-to-r from-pink-300 ",
    middle: "via-pink-300",
    end: "to-pink-300",
    color: "pink-300",
  },
  {
    key: "fairy",
    solo: "bg-pink-300",
    front: "bg-gradient-to-r from-pink-300 ",
    middle: "via-pink-300",
    end: "to-pink-300",
    color: "pink-300",
  },
  {
    key: "fire",
    solo: "bg-red-700",
    front: "bg-gradient-to-r from-red-700 ",
    middle: "via-red-700",
    end: "to-red-700",
    color: "red-700",
  },
  {
    key: "fighting",
    solo: "bg-red-300",
    front: "bg-gradient-to-r from-red-300 ",
    middle: "via-red-300",
    end: "to-red-300",
    color: "red-300",
  },
  {
    key: "grass",
    solo: "bg-green-600",
    front: "bg-gradient-to-r from-green-600 ",
    middle: "via-green-600",
    end: "to-green-600",
    color: "green-600",
  },
  {
    key: "normal",
    solo: "bg-yellow-600",
    front: "bg-gradient-to-r from-yellow-600 ",
    middle: "via-yellow-600",
    end: "to-yellow-600",
    color: "yellow-600",
  },
  {
    key: "ground",
    solo: "bg-yellow-800",
    front: "bg-gradient-to-r from-yellow-800 ",
    middle: "via-yellow-800",
    end: "to-yellow-800",
    color: "yellow-800",
  },
  {
    key: "ghost",
    solo: "bg-purple-200",
    front: "bg-gradient-to-r from-purple-200 ",
    middle: "via-purple-200",
    end: "to-purple-200",
    color: "purple-200",
  },
  {
    key: "electric",
    solo: "bg-yellow-300",
    front: "bg-gradient-to-r from-yellow-300 ",
    middle: "via-yellow-300",
    end: "to-yellow-300",
    color: "yellow-300",
  },
  {
    key: "water",
    solo: "bg-blue-600",
    front: "bg-gradient-to-r from-blue-600 ",
    middle: "via-blue-600",
    end: "to-blue-600",
    color: "blue-600",
  },
  {
    key: "ice",
    solo: "bg-blue-300",
    front: "bg-gradient-to-r from-blue-300 ",
    middle: "via-blue-300",
    end: "to-blue-300",
    color: "blue-300",
  },
  {
    key: "flying",
    solo: "bg-blue-200",
    front: "bg-gradient-to-r from-blue-200 ",
    middle: "via-blue-200",
    end: "to-blue-200",
    color: "blue-200",
  },
  {
    key: "steel",
    solo: "bg-slate-300",
    front: "bg-gradient-to-r from-slate-300 ",
    middle: "via-slate-300",
    end: "to-slate-300",
    color: "slate-300",
  },
  {
    key: "poison",
    solo: "bg-purple-300",
    front: "bg-gradient-to-r from-purple-300 ",
    middle: "via-purple-300",
    end: "to-purple-300",
    color: "purple-300",
  },
];

export function getColorForThisType({ types }: { types: string[] }) {
  let classString = "";

  <div className="bg-gradient-t"></div>;

  if (types.length === 1) {
    const typeColorMatch = typeColorEnum.find(
      (typeColor) => typeColor.key === types[0]
    );

    if (typeColorMatch) return typeColorMatch.solo;
  }

  types.forEach((type, index) => {
    console.log(type);
    const typeColorMatch = typeColorEnum.find(
      (typeColor) => typeColor.key === type
    );
    if (typeColorMatch) {
      if (index === 0) {
        classString += typeColorMatch.front;
      } else if (index === types.length - 1) {
        classString += typeColorMatch.end;
      } else {
        classString += typeColorMatch.middle;
      }
    } else {
      console.log("No Match");
      if (index === 0) {
        classString += " from-black";
      } else if (index === types.length - 1) {
        classString += " to-black";
      } else {
        classString += " via-black";
      }
    }
  });

  return classString;
}
