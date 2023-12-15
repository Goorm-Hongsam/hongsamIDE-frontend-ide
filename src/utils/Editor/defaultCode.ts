const javaDefaultValue = (questionId: string) => {
  return `
// 기본 제공코드는 임의 수정해도 관계 없습니다. 단, 입출력 포맷 주의
public class ${questionId} 	//문제에 따라 변할 수 있도록 수정 필요
{
	public static void main(String args[]) throws Exception
	{
		//여러 개의 테스트 케이스가 주어지므로, 각각을 처리합니다.
		for(int test_case = 1; test_case <= T; test_case++)
		{
			//이 부분에 여러분의 알고리즘 구현이 들어갑니다.
		}
	}
}
`;
};

export default javaDefaultValue;
