import Avatar, { AvatarProps } from "@mui/material/Avatar";

function stringAvatar(name: string) {
    return {
        sx: {
            bgcolor: '#000',
            width: 30,
            height: 30,
            fontSize: 15,
            color: "#FFF",
            textAlign: "center"
        },
        children: `${name.split('')[0].toUpperCase()}`,
    };
}

type AvatarType = Partial<AvatarProps> & {
    profile: string;
}

const AvatarComponent = ({ profile, ...props }: AvatarType) => {    
    // return <Avatar {...props} src={profile?.imgUrl} alt={profile?.email} />;
    const name = profile.split('@')[0]
    return (
        <Avatar
            {...props}
            {...stringAvatar(`${name}`)}
        />
    );
};

export default AvatarComponent;
