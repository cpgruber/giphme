const question = {
  type: 'expand',
  name: 'direction',
  message: '(p)revious or (n)ext',
  default: 'n',
  choices: [
    {
      key: 'p',
      name: 'Prev',
      value: 'p'
    },
    {
      key: 'n',
      name: 'Next',
      value: 'n'
    }
  ]
};

module.exports = question;
