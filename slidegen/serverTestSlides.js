const testSlides = [
  {
    type: "Title",
    options: {
      title: "Test props title",
      subtitle: "from test kitchen",
      image: "https://i.redd.it/j4wdc7bc1f621.jpg"
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
      bullets: ["Just a detail or two"],
      plaintext: true,
      images: [
        {
          // data: null, // TODO: This should maybe be URL,
          url: "https://i.redd.it/8ewex5he4k0y.jpg",
          position: {
            bottom: "10%",
            right: "10%"
          },
          width: "25%"
        },
        {
          // data: null, // TODO: This should maybe be URL,
          url: "https://i.redd.it/8ewex5he4k0y.jpg",
          position: {
            top: "10%",
            left: "10%"
          },
          width: "15%"
        }
      ]
    }
  },
  {
    type: "HalfImageTitle",
    options: {
      title: "Maybe this is a thoughtful quote",
      image: "https://i.redd.it/j4wdc7bc1f621.jpg",
      imageLeft: false
    }
  },
  {
    type: "HalfImageTitle",
    options: {
      title: "A cool caption for sure",
      image: "https://i.redd.it/j4wdc7bc1f621.jpg",
      imageLeft: true
    }
  },
  {
    type: "HalfImageBullets",
    options: {
      title: "You want some reasons?",
      bullets: ["Here's a reason", "Here's another"],
      image: "https://i.redd.it/j4wdc7bc1f621.jpg",
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
      bullets: ["Fact A", "Fact B"],
      image: "https://i.redd.it/j4wdc7bc1f621.jpg",
      imageLeft: false,
      plaintext: false,
      ordered: true
    }
  }
];

module.exports = testSlides;
