export default function classJoin(...args) {
  return args.filter(arg => Boolean(arg)).join(" ");
}
