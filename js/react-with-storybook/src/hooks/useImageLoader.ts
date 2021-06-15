import { useMemo } from 'react';
import { useQuery } from 'react-query';
import isNil from 'utils/isNil';
import isTestEnv from 'utils/isTestEnv';
import { isString } from 'utils/typeCheck';

/**
 * Image 객체를 생성해서 이미지 사용 가능 여부를 확인하는 역할을 한다.
 * react-query를 사용해서 일정 시간동안은 다시 확인하지 않는다.
 * 이미지 데이터 자체를 캐싱하지는 않는다. (CORS 이슈 때문에 fetch가 불가능할 수 있음)
 *
 * @param imageUrl
 */
const useImageLoader = (imageUrl?: string | null) => {
  const { data: imageUrlLoaded, isFetching: isFetchingImage } = useQuery<
    string | null
  >(
    ['imageLoader', imageUrl],
    () => {
      return new Promise((resolve) => {
        if (!imageUrl) {
          resolve(null);
        }

        if (imageUrl) {
          if (isTestEnv()) {
            // 테스트 환경에서는 무조건 성공
            resolve(imageUrl);
          } else {
            const img = new Image();
            img.src = imageUrl;

            img.onload = () => {
              resolve(imageUrl);
            };

            img.onerror = () => {
              resolve(null);
            };
          }
        }
      });
    },
    {
      enabled: !isNil(imageUrl),
      staleTime: 300000, // 5분동안 refetch하지 않도록 함
      cacheTime: 300000, // inactive 아이템 garbage collection까지 5분
      retry: false,
      refetchOnWindowFocus: false,
      refetchInterval: false,
      refetchOnMount: false,
    },
  );

  /**
   * 이미지 로드에 성공했을 때
   */
  const isImageResolved = useMemo(
    () => !!imageUrl && !isFetchingImage && isString(imageUrlLoaded),
    [imageUrl, imageUrlLoaded, isFetchingImage],
  );

  /**
   * 이미지 로드에 실패했을 때
   */
  const isImageBroken = useMemo(
    () => isNil(imageUrl) || (!isFetchingImage && imageUrlLoaded === null),
    [imageUrl, imageUrlLoaded, isFetchingImage],
  );

  return {
    imageUrlLoaded,
    isImageBroken: isImageBroken,
    isImageResolved: isImageResolved,
    isLoadingImage: isFetchingImage,
  };
};

export default useImageLoader;
