export function request(ctx) {
  const { ingredients, culinaryStyle } = ctx.arguments;

  const prompt = `Generate a delicious recipe using the following ingredients: ${ingredients}. The culinary style should be ${culinaryStyle}. Include a title, prep time, cook time, ingredients list, and step-by-step instructions.`;

  return {
    resourcePath: `/model/anthropic.claude-sonnet-5/invoke`,
    method: 'POST',
    params: {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        anthropic_version: 'bedrock-2023-05-31',
        max_tokens: 1000,
        messages: [
          {
            role: 'user',
            content: [{ type: 'text', text: prompt }],
          },
        ],
      }),
    },
  };
}

export function response(ctx) {
  const parsedBody = JSON.parse(ctx.result.body);
  return parsedBody.content[0].text;
}
