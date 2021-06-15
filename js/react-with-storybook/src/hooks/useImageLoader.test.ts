import { renderHook } from '@testing-library/react-hooks';
import { TestQueryClientProvider } from 'utils/testUtils';
import useImageLoader from './useImageLoader';

describe('useImageLoader', () => {
  test('이미지 로딩 후 가져온 url을 제공한다.', async () => {
    // arrange
    const targetUrl = 'https://source.unsplash.com/collection/190727';
    const { result, waitForNextUpdate } = renderHook(
      () => useImageLoader(targetUrl),
      {
        wrapper: TestQueryClientProvider,
      },
    );

    // assert
    expect(result.current.isLoadingImage).toEqual(true);
    expect(result.current.imageUrlLoaded).toEqual(undefined);
    expect(result.current.isImageResolved).toEqual(false);
    expect(result.current.isImageBroken).toEqual(false);

    await waitForNextUpdate(); // resolve 대기

    expect(result.current.isLoadingImage).toEqual(false);
    expect(result.current.imageUrlLoaded).toEqual(targetUrl);
    expect(result.current.isImageResolved).toEqual(true);
    expect(result.current.isImageBroken).toEqual(false);
  });

  test('imageUrl에 빈 문자열이 들어가면 image broken', async () => {
    // arrange
    const { result, waitForNextUpdate } = renderHook(() => useImageLoader(''), {
      wrapper: TestQueryClientProvider,
    });

    // assert
    expect(result.current.isLoadingImage).toEqual(true);
    expect(result.current.imageUrlLoaded).toEqual(undefined);
    expect(result.current.isImageResolved).toEqual(false);
    expect(result.current.isImageBroken).toEqual(false);

    await waitForNextUpdate(); // resolve 대기

    expect(result.current.isLoadingImage).toEqual(false);
    expect(result.current.imageUrlLoaded).toEqual(null);
    expect(result.current.isImageResolved).toEqual(false);
    expect(result.current.isImageBroken).toEqual(true);
  });

  test.each([[null], [undefined]])(
    'imageUrl에 %s 전달되면 로딩 시도를 하지 않는다.',
    (imageUrl) => {
      // arrange
      const { result } = renderHook(() => useImageLoader(imageUrl), {
        wrapper: TestQueryClientProvider,
      });

      // assert
      expect(result.current.isLoadingImage).toEqual(false);
      expect(result.current.imageUrlLoaded).toEqual(undefined);
      expect(result.current.isImageResolved).toEqual(false);
      expect(result.current.isImageBroken).toEqual(true);
    },
  );
});
