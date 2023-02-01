import cardImg from "../asset/img/test-board-img.jpg";
import collabs from "../asset/img/profile-pic - Copy.png";

interface dragDropColumn {
  backlog: {
    columnTitle: string;
    cards: {
      img: string | undefined;
      cardId: string;
      labels: { bgColor: string; textColor: string; text: string }[];
      collabs: string[];
    }[];
  };
}

const dragDropColumns = {
  backlog: {
    columnTitle: "Backlog 🤔",
    columnId: "backlog",
    cards: [
      {
        img: undefined,
        cardTitle: "✋🏿 Add what you'd like to work on below",
        cardId: "card-a",
        labels: [
          {
            bgColor: "bg-[#EBDCF9]",
            textColor: "text-[#9B51E0]",
            text: "Concept",
          },
        ],
        collabs: [],
      },
      {
        img: cardImg,
        cardTitle: "Github jobs challenge",
        cardId: "card-b",
        labels: [
          {
            bgColor: "bg-[#D5E6FB]",
            textColor: "text-[#2F80ED]",
            text: "Technical",
          },
          {
            bgColor: "bg-[#D3EADD]",
            textColor: "text-[#219653]",
            text: "Design",
          },
        ],
        collabs: [collabs, "Grey"],
      },
    ],
  },
  inProgress: {
    columnTitle: "In Progress 📚",
    columnId: "inProgress",
    cards: [
      {
        img: cardImg,
        cardTitle: "✋🏿 Move anything 'ready' here",
        cardId: "card-c",
        labels: [
          {
            bgColor: "bg-[#D5E6FB]",
            textColor: "text-[#2F80ED]",
            text: "Technical",
          },
          {
            bgColor: "bg-[#D3EADD]",
            textColor: "text-[#219653]",
            text: "Design",
          },
        ],
        collabs: [collabs, collabs],
      },
      {
        img: cardImg,
        cardTitle: "Unsplash challenges - Back-end",
        cardId: "card-d",
        labels: [
          {
            bgColor: "bg-[#FCF4DB]",
            textColor: "text-[#F2C94C]",
            text: "Frontend",
          },
          {
            bgColor: "bg-[#EBDCF9]",
            textColor: "text-[#9B51E0]",
            text: "Concept",
          },
        ],
        collabs: [collabs, "jims"],
      },
      {
        img: cardImg,
        cardTitle: "Read Atomic Habits in the next 30 days",
        cardId: "card-e",
        labels: [
          {
            bgColor: "bg-[#D5E6FB]",
            textColor: "text-[#2F80ED]",
            text: "Technical",
          },
        ],
        collabs: [collabs, collabs, "Adam"],
      },
    ],
  },
  inReview: {
    columnTitle: "In Review ⚙️",
    columnId: "inReview",
    cards: [
      {
        img: cardImg,
        cardTitle: "✋🏿 Move anything that is actually started here",
        cardId: "card-f",
        labels: [
          {
            bgColor: "bg-[#D5E6FB]",
            textColor: "text-[#2F80ED]",
            text: "Technical",
          },
          {
            bgColor: "bg-[#EBDCF9]",
            textColor: "text-[#9B51E0]",
            text: "Concept",
          },
        ],
        collabs: [collabs],
      },
      {
        img: undefined,
        cardTitle: "Add finishing touches for Windbnb solution",
        cardId: "card-g",
        labels: [
          {
            bgColor: "bg-[#FCF4DB]",
            textColor: "text-[#F2C94C]",
            text: "Fullstack",
          },
        ],
        collabs: [],
      },
    ],
  },
  completed: {
    columnTitle: "Completed 🙌🏽",
    columnId: "completed",
    cards: [
      {
        img: cardImg,
        cardTitle: "✋🏿 Move anything from doing to done here",
        cardId: "card-h",
        labels: [
          {
            bgColor: "bg-[#D5E6FB]",
            textColor: "text-[#2F80ED]",
            text: "Technical",
          },
          {
            bgColor: "bg-[#EBDCF9]",
            textColor: "text-[#9B51E0]",
            text: "Concept",
          },
        ],
        collabs: [collabs],
      },
    ],
  },
};

export default dragDropColumns;
