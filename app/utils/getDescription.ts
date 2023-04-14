export const getDescription = (desc: string) => {
  return desc.split(
    'This is a demonstration store. You can purchase products like this from The Ski Chalet & Treasure Cove Scuba. ',
  )[1];
};
