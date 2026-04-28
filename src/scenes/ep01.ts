import type { Episode } from "../engine/types";

const bg = (file: string) => `${import.meta.env.BASE_URL}scenes/${file}`;

export const ep01: Episode = {
  id: "ep01",
  title: "Episode 1 — The Five Dollars",
  startScene: "title",
  scenes: {
    title: {
      id: "title",
      background: bg("01_title.png"),
      lines: [],
      next: "intro_1",
    },
    intro_1: {
      id: "intro_1",
      background: bg("02_intro_lucy.png"),
      lines: [
        {
          id: "lucy_intro_1a",
          speaker: "lucy",
          text: "Hi, I'm Lucy.",
        },
        {
          id: "lucy_intro_1b",
          speaker: "lucy",
          text: "My brother Elliot and I are in a new show called Elliot and Lucy. Crazy title, huh?",
        },
      ],
      next: "intro_2",
    },
    intro_2: {
      id: "intro_2",
      background: bg("03_intro_lucy_excited.png"),
      lines: [
        {
          id: "lucy_intro_2a",
          speaker: "lucy",
          text: "Elliot and I find ourselves in what my dad calls ethical situations. Like honesty, empathy, forgiveness, and charity.",
        },
        {
          id: "lucy_intro_2b",
          speaker: "lucy",
          text: "I know it sounds kind of serious, but not the way we do it. Like the time I found five dollars at the store.",
        },
      ],
      next: "aisle_finds",
    },
    aisle_finds: {
      id: "aisle_finds",
      background: bg("04_aisle_finds_money.png"),
      lines: [
        {
          id: "lucy_finds",
          speaker: "lucy",
          text: "Hey, what's that on the floor?",
        },
        {
          id: "narrator_pickup",
          speaker: "narrator",
          text: "Lucy picks up a crisp five dollar bill.",
        },
      ],
      next: "aisle_dream",
    },
    aisle_dream: {
      id: "aisle_dream",
      background: bg("05_aisle_daydream.png"),
      lines: [
        {
          id: "lucy_dream",
          speaker: "lucy",
          text: "Five whole dollars! I thought I was king of the world!",
        },
      ],
      next: "elliot_arrives",
    },
    elliot_arrives: {
      id: "elliot_arrives",
      background: bg("06_aisle_elliot_smile.png"),
      lines: [
        {
          id: "elliot_what",
          speaker: "elliot",
          text: "Whoa, where'd you get that?",
        },
        {
          id: "lucy_explain",
          speaker: "lucy",
          text: "I just found it! Right here on the floor.",
        },
      ],
      next: "elliot_worried",
    },
    elliot_worried: {
      id: "elliot_worried",
      background: bg("07_aisle_elliot_worried.png"),
      lines: [
        {
          id: "elliot_uhoh",
          speaker: "elliot",
          text: "Hmm... someone must have dropped it. We should head to the checkout.",
        },
      ],
      next: "checkout_walk",
    },
    checkout_walk: {
      id: "checkout_walk",
      background: bg("08_walking_to_checkout.png"),
      lines: [
        {
          id: "lucy_walk",
          speaker: "lucy",
          text: "Off to the checkout we go...",
        },
      ],
      next: "checkout_arrive",
    },
    checkout_arrive: {
      id: "checkout_arrive",
      background: bg("09_at_checkout.png"),
      lines: [
        {
          id: "lucy_at_checkout",
          speaker: "lucy",
          text: "There's a lady in front of us paying for her stuff.",
        },
      ],
      next: "checkout_pay",
    },
    checkout_pay: {
      id: "checkout_pay",
      background: bg("10_checkout_483.png"),
      lines: [
        {
          id: "cashier_total",
          speaker: "cashier",
          text: "That'll be four dollars and eighty-three cents, ma'am.",
        },
      ],
      next: "lady_realizes",
    },
    lady_realizes: {
      id: "lady_realizes",
      background: bg("11_lady_realizes.png"),
      lines: [
        {
          id: "lady_oh_dear",
          speaker: "lady",
          text: "Oh, dear. I had a crisp new five dollar bill in my purse!",
        },
        {
          id: "lady_explain",
          speaker: "lady",
          text: "It must have popped out somewhere in the store when I pulled out my phone.",
        },
      ],
      next: "lucy_realizes",
    },
    lucy_realizes: {
      id: "lucy_realizes",
      background: bg("12_lucy_worried.png"),
      lines: [
        {
          id: "lucy_uhoh",
          speaker: "lucy",
          text: "Uh oh...",
        },
      ],
      next: "lucy_choice_setup",
    },
    lucy_choice_setup: {
      id: "lucy_choice_setup",
      background: bg("13_lucy_holds_money.png"),
      lines: [
        {
          id: "lucy_setup",
          speaker: "lucy",
          text: "It's pretty obvious that the five dollars I found belongs to this lady. So, I need to make a decision.",
        },
        {
          id: "lucy_help_me",
          speaker: "lucy",
          text: "And you can help me make it.",
        },
      ],
      next: "the_choice",
    },

    the_choice: {
      id: "the_choice",
      background: bg("13_lucy_holds_money.png"),
      lines: [
        {
          id: "narrator_choice",
          speaker: "narrator",
          text: "What do YOU think Lucy should do?",
        },
      ],
      choices: [
        { id: "keep", label: "Keep the money", next: "keep_branch" },
        {
          id: "give",
          label: "Give the money to the lady",
          next: "give_branch",
          isCorrect: true,
        },
        { id: "blame", label: "Blame Elliot", next: "blame_branch" },
      ],
    },

    keep_branch: {
      id: "keep_branch",
      background: bg("12_lucy_worried.png"),
      lines: [
        {
          id: "lucy_keep",
          speaker: "lucy",
          text: "I'll just... keep it. Finders keepers, right?",
        },
        {
          id: "narrator_keep_1",
          speaker: "narrator",
          text: "Lucy walks past the lady, holding the money tight.",
        },
        {
          id: "narrator_keep_2",
          speaker: "narrator",
          text: "The lady looks sad. She really needed that five dollars.",
        },
      ],
      next: "keep_wrong",
    },
    keep_wrong: {
      id: "keep_wrong",
      background: bg("12_lucy_worried.png"),
      lines: [
        {
          id: "lucy_keep_wrong",
          speaker: "lucy",
          text: "Hmm... that doesn't feel right. My tummy feels funny.",
        },
        {
          id: "narrator_try_again",
          speaker: "narrator",
          text: "Hmm, that wasn't the right choice. Let's try again!",
        },
      ],
      next: "the_choice",
    },

    blame_branch: {
      id: "blame_branch",
      background: bg("16_blame_elliot_shocked.png"),
      lines: [
        {
          id: "lucy_blame_1",
          speaker: "lucy",
          text: "Um, it was Elliot's fault!",
        },
        { id: "elliot_what_1", speaker: "elliot", text: "What?!" },
        {
          id: "lucy_blame_2",
          speaker: "lucy",
          text: "Yeah, when he saw me pick up the money, he said I should keep it!",
        },
      ],
      next: "blame_branch_2",
    },
    blame_branch_2: {
      id: "blame_branch_2",
      background: bg("17_blame_argument.png"),
      lines: [
        {
          id: "elliot_what_2",
          speaker: "elliot",
          text: "What?! I never said that!",
        },
        {
          id: "elliot_take",
          speaker: "elliot",
          text: "But now that I know it's yours, here!",
        },
      ],
      next: "blame_branch_3",
    },
    blame_branch_3: {
      id: "blame_branch_3",
      background: bg("19_elliot_returns_money.png"),
      lines: [
        {
          id: "narrator_blame",
          speaker: "narrator",
          text: "Elliot hands the money to the lady. Lucy runs off.",
        },
        { id: "mom_callback", speaker: "mom", text: "Lucy, come back here!" },
      ],
      next: "blame_wrong",
    },
    blame_wrong: {
      id: "blame_wrong",
      background: bg("18_lucy_close_up_shock.png"),
      lines: [
        {
          id: "narrator_blame_wrong",
          speaker: "narrator",
          text: "Hmm, blaming someone else wasn't honest either. Let's try again!",
        },
      ],
      next: "the_choice",
    },

    give_branch: {
      id: "give_branch",
      background: bg("14_giving_money.png"),
      lines: [
        {
          id: "lucy_give",
          speaker: "lucy",
          text: "Um, excuse me, ma'am. I think this money is probably yours.",
        },
        {
          id: "lady_where",
          speaker: "lady",
          text: "Oh! Where did you find it?",
        },
        {
          id: "lucy_cheese",
          speaker: "lucy",
          text: "Over by the cheese section.",
        },
      ],
      next: "give_branch_2",
    },
    give_branch_2: {
      id: "give_branch_2",
      background: bg("15_lady_smiles.png"),
      lines: [
        {
          id: "lady_yes",
          speaker: "lady",
          text: "Yes! That's where I answered my phone.",
        },
        {
          id: "lady_thanks",
          speaker: "lady",
          text: "Thank you so much for your honesty. You are a lovely young lady.",
        },
        {
          id: "lady_reward",
          speaker: "lady",
          text: "And that kind of honesty deserves a reward. That is, if it's OK with your mom.",
        },
      ],
      next: "outro_1",
    },

    outro_1: {
      id: "outro_1",
      background: bg("20_outro_lucy.png"),
      lines: [
        {
          id: "lucy_outro_1",
          speaker: "lucy",
          text: "That story didn't actually happen... but it could have!",
        },
        {
          id: "lucy_outro_2",
          speaker: "lucy",
          text: "There are tons of situations where Elliot, me, or both of us face a choice.",
        },
      ],
      next: "outro_2",
    },
    outro_2: {
      id: "outro_2",
      background: bg("21_outro_lucy_arms_wide.png"),
      lines: [
        {
          id: "lucy_outro_3",
          speaker: "lucy",
          text: "Mom and Dad call them ethical choices. And we always learn something kind of fun.",
        },
        {
          id: "lucy_outro_4",
          speaker: "lucy",
          text: "So come on — let's make the world a better place!",
        },
      ],
      next: "ending",
    },
    ending: {
      id: "ending",
      background: bg("01_title.png"),
      lines: [],
      isEnding: true,
      endingMessage: "Today we learned about HONESTY.",
    },
  },
};
