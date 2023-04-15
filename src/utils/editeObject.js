const editObject = (data) => {
  const { talk_watched_at: watchedAt, talk_rate: rate, ...rest } = data;
  const talk = { watchedAt, rate };
  return { ...rest, talk };
};

module.exports = editObject;