const testSlides = [
  {
    type: "Title",
    options: {
      title: "Test props title",
      subtitle: "from test kitchen"
    }
  },
  {
    type: "Bullets",
    options: {
      title: "Here's a bullet slide",
      bullets: [
        "Isn't this soooo powerpointy?",
        "I actually rolled it myself!",
        "Alright maybe a couple more points",
        "Here is a long point like you would have in your presentation if you were bad",
        "Hell yeah"
      ],
      bulletList: true
    }
  },
  {
    type: "Bullets",
    options: {
      title: "Here's a numbered slide",
      bullets: [
        "Isn't this soooo powerpointy?",
        "I actually rolled it myself!",
        "Alright maybe a couple more points",
        "Here is a long point like you would have in your presentation if you were bad",
        "Hell yeah"
      ],
      ordered: true
    }
  },
  {
    type: "Bullets",
    options: {
      title: "Here's a list slide",
      bullets: [
        "Isn't this soooo powerpointy?",
        "I actually rolled it myself!",
        "Alright maybe a couple more points",
        "Here is a long point like you would have in your presentation if you were bad",
        "Hell yeah"
      ],
      plaintext: true
    }
  },
  {
    type: "HalfImageTitle",
    options: {
      title: "Maybe this is a thoughtful quote",
      image: "assets/fog.jpg",
      imageLeft: false
    }
  },
  {
    type: "HalfImageTitle",
    options: {
      title: "Maybe this is a thoughtful quote",
      image: "assets/fog.jpg",
      imageLeft: true
    }
  },
  {
    type: "HalfImageBullets",
    options: {
      title: "You want some reasons?",
      bullets: [
        "Here's a reason",
        "Here's another"
      ],
      image: "assets/fog.jpg",
      imageLeft: true,
      plaintext: false,
      ordered: false
    }
  },
  {
    type: "HalfImageBullets",
    options: {
      title: "Now I'm over here",
      subtitle: "and can still have a subtitle!",
      bullets: [
        "Fact A",
        "Fact B"
      ],
      image: "assets/fog.jpg",
      imageLeft: false,
      plaintext: false,
      ordered: true
    }
  }
];

export default testSlides;
