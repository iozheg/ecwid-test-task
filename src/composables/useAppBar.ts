const title = ref('');
export function useAppBar() {
  function setTitle(newTitle: string) {
    title.value = newTitle;
  }

  return {
    title,
    setTitle,
  };
}
