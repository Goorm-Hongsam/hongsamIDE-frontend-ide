const javaDefaultValue = (questionId: string) => {
  return `
public class ${questionId} 	
{
	public static void main(String args[]) throws Exception
	{
		//이 부분에 여러분의 알고리즘을 구현해주세요
	}
}
`;
};

export default javaDefaultValue;
