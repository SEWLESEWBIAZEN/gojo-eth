export default function MapEmbed() {
  return (
    <div className="w-full h-[400px]">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3173.1111745317645!2d-121.90818752454412!3d37.322258972114936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fca5bb9f43a19%3A0xe8b0c1e229fb4e5c!2s1261%20W%20San%20Carlos%20St%2C%20San%20Jose%2C%20CA%2095126%2C%20USA!5e0!3m2!1sen!2sus!4v1691610400000!5m2!1sen!2sus"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}
